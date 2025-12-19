"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  ExternalLink,
  MessageCircle,
  DollarSign,
  Clock,
  User,
  FileText,
} from "lucide-react";
import { StatusToggle } from "./StatusToggle";

interface DetailModalProps {
  type: "quote" | "applicant";
  data: any;
  isOpen: boolean;
  onClose: () => void;
}

export function DetailModal({ type, data, isOpen, onClose }: DetailModalProps) {
  const [statusOptions, setStatusOptions] = useState(
    type === "quote"
      ? ["New", "Contacted", "In Progress", "Won", "Lost", "Archived"]
      : ["Applied", "Screening", "Vetted", "Rejected"]
  );

  if (!data) return null;

  if (type === "quote") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">
              Project Inquiry Details
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-3xl font-bold text-slate-900">{data.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <StatusToggle
                    id={data.id}
                    initialStatus={data.status}
                    table="quotes"
                    options={statusOptions}
                  />
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <Card>
              <CardContent className="p-6">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Email</p>
                      <a
                        href={`mailto:${data.email}`}
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        {data.email}
                      </a>
                    </div>
                  </div>
                  {data.whatsapp && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-500">WhatsApp</p>
                        <a
                          href={`https://wa.me/${data.whatsapp.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-green-600 hover:underline"
                        >
                          {data.whatsapp}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Project Details */}
            <Card>
              <CardContent className="p-6">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Project Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase">Service Type</p>
                    <Badge className="bg-blue-50 text-blue-700 mt-1 font-semibold">
                      {data.service_type}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase">Budget Range</p>
                    <div className="flex items-center gap-2 mt-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <p className="font-bold text-slate-900">{data.budget_range}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase">Deadline</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <p className="font-semibold text-slate-900">{data.deadline}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Description */}
            {data.description && (
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Project Description
                  </h4>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {data.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Timestamps */}
            <Card>
              <CardContent className="p-6">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Timeline
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-slate-500 w-32">Created:</p>
                    <p className="font-semibold text-slate-900">
                      {new Date(data.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-slate-500 w-32">Status:</p>
                    <p className="font-semibold text-slate-900">{data.status}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              {data.whatsapp && (
                <Button
                  asChild
                  className="bg-green-600 hover:bg-green-700"
                >
                  <a
                    href={`https://wa.me/${data.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact via WhatsApp
                  </a>
                </Button>
              )}
              <Button asChild variant="outline">
                <a href={`mailto:${data.email}`}>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Applicant view
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900">
            Applicant Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-3xl font-bold text-slate-900">{data.full_name}</h3>
              <div className="flex items-center gap-2 mt-2">
                <StatusToggle
                  id={data.id}
                  initialStatus={data.status}
                  table="applicants"
                  options={statusOptions}
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-purple-600" />
                Contact Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <a
                      href={`mailto:${data.email}`}
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      {data.email}
                    </a>
                  </div>
                </div>
                {data.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Phone</p>
                      <a
                        href={`tel:${data.phone}`}
                        className="font-semibold text-slate-900 hover:underline"
                      >
                        {data.phone}
                      </a>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Location</p>
                    <p className="font-semibold text-slate-900">{data.city}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Details */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Professional Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase">Primary Skill</p>
                  <Badge className="bg-purple-50 text-purple-700 mt-1 font-semibold">
                    {data.primary_skill}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">Experience</p>
                  <p className="font-bold text-slate-900 mt-1">{data.years_experience}</p>
                </div>
              </div>
              {data.portfolio_link && (
                <div className="mt-4">
                  <p className="text-xs text-slate-500 uppercase mb-2">Portfolio</p>
                  <a
                    href={data.portfolio_link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-all"
                  >
                    View Portfolio <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timestamps */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                Timeline
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-slate-500 w-32">Applied:</p>
                  <p className="font-semibold text-slate-900">
                    {new Date(data.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-slate-500 w-32">Status:</p>
                  <p className="font-semibold text-slate-900">{data.status}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button asChild>
              <a href={`mailto:${data.email}`}>
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </a>
            </Button>
            {data.portfolio_link && (
              <Button asChild variant="outline">
                <a href={data.portfolio_link} target="_blank" rel="noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Portfolio
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
